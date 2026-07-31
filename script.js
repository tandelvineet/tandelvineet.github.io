const menuButton=document.querySelector('.menu');
const menuLinks=document.querySelector('.links');

if(menuButton&&menuLinks){
  menuButton.addEventListener('click',()=>{
    const isOpen=menuLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(isOpen));
  });

  menuLinks.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click',()=>{
      menuLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
    });
  });
}

document.querySelectorAll('[data-year]').forEach(element=>{
  element.textContent=new Date().getFullYear();
});

document.querySelectorAll('.copy-email').forEach(button=>{
  button.addEventListener('click',async()=>{
    const email=button.dataset.email;
    const status=document.querySelector('.copy-status');

    try{
      if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(email);
      }else{
        const textArea=document.createElement('textarea');
        textArea.value=email;
        textArea.style.position='fixed';
        textArea.style.opacity='0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      if(status) status.textContent='Email copied.';
    }catch(error){
      if(status) status.textContent='Email: '+email;
    }
  });
});
