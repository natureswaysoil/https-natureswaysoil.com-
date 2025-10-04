"use strict";(()=>{var e={};e.id=91,e.ids=[91],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,o){return o in r?r[o]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,o)):"function"==typeof r&&"default"===o?r:void 0}}})},4148:(e,r,o)=>{o.r(r),o.d(r,{config:()=>d,default:()=>l,routeModule:()=>p});var t={};o.r(t),o.d(t,{default:()=>i});var s=o(1802),n=o(7153),a=o(6249);async function i(e,r){if("POST"!==e.method)return r.status(405).json({error:"Method not allowed"});let{name:o,email:t,subject:s,message:n,type:a}=e.body;if(!o||!t||!n)return r.status(400).json({error:"Missing required fields"});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return r.status(400).json({error:"Invalid email address"});try{let e;let i=process.env.RESEND_API_KEY,l=process.env.RESEND_FROM||"Nature's Way Soil <no-reply@natureswaysoil.com>";if(e="sales"===a?process.env.SALES_TO||"sales@natureswaysoil.com":"james"===a?process.env.JAMES_TO||"james@natureswaysoil.com":process.env.SUPPORT_TO||"support@natureswaysoil.com,sales@natureswaysoil.com",!i)return console.error("RESEND_API_KEY not configured"),r.status(500).json({error:"Email service not configured"});let d=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({from:l,to:e.split(","),subject:s||`New Contact Form Submission from ${o}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">New Contact Form Submission</h2>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${o}</p>
              <p><strong>Email:</strong> ${t}</p>
              <p><strong>Type:</strong> ${a||"general"}</p>
              ${s?`<p><strong>Subject:</strong> ${s}</p>`:""}
            </div>
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap; color: #4b5563;">${n}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Reply directly to this email to respond to ${o} at ${t}
              </p>
            </div>
          </div>
        `,reply_to:t})}),p=await d.json();if(!d.ok)return console.error("Resend API error:",p),r.status(500).json({error:"Failed to send email",details:p});return r.status(200).json({success:!0,id:p.id})}catch(e){return console.error("Error sending email:",e),r.status(500).json({error:"Internal server error"})}}let l=(0,a.l)(t,"default"),d=(0,a.l)(t,"config"),p=new s.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:t})},7153:(e,r)=>{var o;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))},1802:(e,r,o)=>{e.exports=o(145)}};var r=require("../../webpack-api-runtime.js");r.C(e);var o=r(r.s=4148);module.exports=o})();