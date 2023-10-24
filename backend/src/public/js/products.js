


const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', ()=>{
    
   // location.href="/api/sessions/logout"

   window.location.href='/api/sessions/logout'
   
})

export default logoutButton