#!/usr/bin/env python3
import os
import json
import random
import time
from datetime import datetime
import requests
from openai import OpenAI

class TikTokAutomation:
    def __init__(self):
        # Load API credentials
        self.load_credentials()
        
        # Initialize OpenAI
        self.openai_client = OpenAI(api_key=self.openai_api_key)
        
        # Load product database
        with open('/home/ubuntu/tiktok_automation/natures_way_products.json', 'r') as f:
            data = json.load(f)
            self.products = data['products'] if 'products' in data else data
        
        # Get Pictory access token
        self.pictory_access_token = self.get_pictory_access_token()
        
    def load_credentials(self):
        """Load API credentials from secrets file"""
        with open('/home/ubuntu/.config/abacusai_auth_secrets.json', 'r') as f:
            secrets = json.load(f)
        
        self.openai_api_key = secrets['openai']['secrets']['api_key']['value']
        self.pictory_client_id = secrets['pictory']['secrets']['client_id']['value']
        self.pictory_client_secret = secrets['pictory']['secrets']['client_secret']['value']
        self.tiktok_access_token = secrets['tiktok']['secrets']['client_key']['value']
    
    def get_pictory_access_token(self):
        """Get Pictory access token"""
        url = "https://api.pictory.ai/pictoryapis/v1/oauth2/token"
        
        payload = {
            "client_id": self.pictory_client_id,
            "client_secret": self.pictory_client_secret
        }
        
        headers = {"Content-Type": "application/json"}
        
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        return response.json()['access_token']
    
    def generate_script(self, product):
        """Generate TikTok script using OpenAI"""
        prompt = f"""Create a 30-second TikTok educational script about this product:

Product: {product['name']}
Description: {product['description']}
Benefits: {', '.join(product['benefits'])}
Target Audience: {product['target_audience']}
Price: ${product['price']}

Requirements:
- Hook in first 3 seconds
- Educational and engaging
- Include product benefits
- Call to action
- Keep it under 150 words
- Add relevant hashtags
- Natural, conversational tone

Format:
[Hook line]

[Educational content with benefits]

[Call to action]

[Hashtags]"""

        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a TikTok content creator specializing in organic gardening and soil health education."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8
        )
        
        script = response.choices[0].message.content
        
        return {
            'product': product['name'],
            'script': script,
            'hashtags': self.generate_hashtags(product)
        }
    
    def generate_hashtags(self, product):
        """Generate relevant hashtags"""
        base_tags = ["#NaturesWaySoil", "#OrganicGardening", "#GardenTok"]
        
        category_tags = {
            "Soil Amendment": ["#GardeningTips", "#OrganicSoil", "#GardenLife"],
            "Potting Mix": ["#PlantTok", "#IndoorPlants", "#PlantCare"],
            "Fertilizer": ["#PlantFood", "#HealthyPlants", "#GardenSuccess"]
        }
        
        tags = base_tags + category_tags.get(product['category'], ["#PlantTok", "#HealthyPlants"])
        
        # Add product-specific tag
        product_tag = "#" + product['name'].replace(" ", "").replace("&", "")
        tags.append(product_tag)
        tags.append("#" + product['category'].replace(" ", ""))
        
        return " ".join(tags)
    
    def generate_video(self, script_data):
        """Generate video using Pictory API and wait for completion"""
        try:
            # Step 1: Create video job
            url = "https://api.pictory.ai/pictoryapis/v1/video/storyboard"
            
            headers = {
                "Authorization": f"Bearer {self.pictory_access_token}",
                "Content-Type": "application/json"
            }
            
            data = {
                "videoName": f"NWS_{script_data['product'].replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                "videoDescription": f"Educational video about {script_data['product']}",
                "scenes": [
                    {
                        "text": script_data['script'],
                        "voiceOver": True,
                        "splitTextOnNewLine": True,
                        "splitTextOnPeriod": True
                    }
                ],
                "brandLogo": {
                    "url": "https://www.natureswayresources.com/wp-content/uploads/2023/09/00939640.gif",
                    "verticalAlignment": "bottom",
                    "horizontalAlignment": "center"
                },
                "aspectRatio": "9:16"  # TikTok vertical format
            }
            
            print(f"Creating video job for {script_data['product']}...")
            response = requests.post(url, json=data, headers=headers)
            
            if response.status_code != 200:
                print(f"Error response: {response.text}")
            
            response.raise_for_status()
            
            job_data = response.json()
            job_id = job_data.get('jobId')
            
            if not job_id:
                print(f"Error: No job ID returned. Response: {job_data}")
                return None
            
            print(f"Video job created with ID: {job_id}")
            
            # Step 2: Poll for video completion (max 10 minutes)
            max_attempts = 40  # 40 attempts * 15 seconds = 10 minutes
            attempt = 0
            
            while attempt < max_attempts:
                time.sleep(15)  # Wait 15 seconds between checks
                attempt += 1
                
                # Check job status
                status_url = f"https://api.pictory.ai/pictoryapis/v1/jobs/{job_id}"
                status_response = requests.get(status_url, headers=headers)
                status_response.raise_for_status()
                
                status_data = status_response.json()
                status = status_data.get('status')
                
                print(f"Attempt {attempt}/{max_attempts}: Video status = {status}")
                
                if status == 'completed':
                    video_url = status_data.get('videoUrl')
                    if video_url:
                        print(f"Video completed! URL: {video_url}")
                        
                        # Download the video
                        video_path = f"/home/ubuntu/tiktok_automation/generated_videos/{script_data['product'].replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"
                        
                        video_response = requests.get(video_url)
                        video_response.raise_for_status()
                        
                        with open(video_path, 'wb') as f:
                            f.write(video_response.content)
                        
                        print(f"Video downloaded to: {video_path}")
                        
                        return {
                            'job_id': job_id,
                            'video_url': video_url,
                            'video_path': video_path,
                            'status': 'completed'
                        }
                    else:
                        print("Video completed but no URL provided")
                        return None
                
                elif status == 'failed':
                    print(f"Video generation failed: {status_data}")
                    return None
            
            print(f"Timeout: Video not completed after {max_attempts * 15} seconds")
            return None
            
        except Exception as e:
            print(f"Error generating video: {str(e)}")
            return None
    
    def post_to_tiktok(self, video_path, caption):
        """Post video to TikTok (placeholder - requires TikTok API setup)"""
        # Note: TikTok API posting requires additional setup and approval
        # For now, this saves the video and caption for manual posting
        
        print(f"\n{'='*60}")
        print("VIDEO READY FOR TIKTOK POSTING")
        print(f"{'='*60}")
        print(f"Video: {video_path}")
        print(f"\nCaption:\n{caption}")
        print(f"{'='*60}\n")
        
        return {
            'status': 'ready_for_posting',
            'video_path': video_path,
            'caption': caption
        }
    
    def run_automation(self, num_videos=2):
        """Run the complete automation"""
        print(f"\n{'='*60}")
        print(f"TIKTOK AUTOMATION STARTED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*60}\n")
        
        results = []
        
        # Select random products
        selected_products = random.sample(self.products, min(num_videos, len(self.products)))
        
        for product in selected_products:
            print(f"\nProcessing: {product['name']}")
            print("-" * 60)
            
            # Generate script
            print("1. Generating script...")
            script_data = self.generate_script(product)
            print(f"✓ Script generated ({len(script_data['script'])} characters)")
            
            # Generate video
            print("2. Generating video (this may take 5-15 minutes)...")
            video_data = self.generate_video(script_data)
            
            if video_data and video_data['status'] == 'completed':
                print("✓ Video generated successfully")
                
                # Prepare for TikTok posting
                caption = f"{script_data['script']}\n\n{script_data['hashtags']}"
                tiktok_result = self.post_to_tiktok(video_data['video_path'], caption)
                
                results.append({
                    'product': product['name'],
                    'script': script_data['script'],
                    'hashtags': script_data['hashtags'],
                    'video_url': video_data['video_url'],
                    'video_path': video_data['video_path'],
                    'job_id': video_data['job_id'],
                    'tiktok_status': tiktok_result['status'],
                    'status': 'success',
                    'timestamp': datetime.now().isoformat()
                })
            else:
                print("✗ Video generation failed")
                results.append({
                    'product': product['name'],
                    'script': script_data['script'],
                    'hashtags': script_data['hashtags'],
                    'video_url': None,
                    'video_path': None,
                    'status': 'failed',
                    'timestamp': datetime.now().isoformat()
                })
            
            print("-" * 60)
        
        # Save results
        results_file = f"/home/ubuntu/tiktok_automation/generated_videos/automation_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(results_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n{'='*60}")
        print(f"AUTOMATION COMPLETED")
        print(f"Results saved to: {results_file}")
        print(f"{'='*60}\n")
        
        return results

if __name__ == "__main__":
    automation = TikTokAutomation()
    results = automation.run_automation(num_videos=1)  # Start with 1 video for testing
    
    # Print summary
    print("\nSUMMARY:")
    print(f"Total videos processed: {len(results)}")
    print(f"Successful: {sum(1 for r in results if r['status'] == 'success')}")
    print(f"Failed: {sum(1 for r in results if r['status'] == 'failed')}")
