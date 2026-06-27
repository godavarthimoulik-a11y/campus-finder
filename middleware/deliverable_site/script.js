document.addEventListener('DOMContentLoaded',()=>{
  // set year
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

  // nav toggle for small screens
  const nav=document.getElementById('nav');
  const navToggle=document.getElementById('navToggle');
  if(navToggle){
    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(nav) nav.style.display = expanded ? 'none' : 'flex';
    });
  }

  // contact form handling — POSTs to /api/contact when a backend is available,
  // else falls back to a demo-only response.
  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name')||'').toString().trim();
      const email = (data.get('email')||'').toString().trim();
      const message = (data.get('message')||'').toString().trim();
      if(name.length<2){status.textContent='Please enter your name.';return}
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){status.textContent='Please enter a valid email.';return}
      if(message.length<5){status.textContent='Message is too short.';return}

      const payload = {name,email,message};
      status.textContent='Sending…';

      try{
        const resp = await fetch('/api/contact',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload)
        });
        if(!resp.ok) throw new Error('Server error');
        const json = await resp.json();
        status.textContent = json.message || 'Thanks — message received.';
        form.reset();
      }catch(err){
        // fallback demo behaviour
        setTimeout(()=>{
          status.textContent='Thanks! This is a demo site — form is not connected to a server.';
          form.reset();
        },700);
      }
    });
  }
});
