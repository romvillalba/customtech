
  const headerLogin = document.querySelector('.image-header-login');
  const modalHeader = document.querySelector('.modal-header')
  const hidden = document.querySelector('.menu-hidden');
  const burger = document.querySelector('.burger-menu');
  const login = document.querySelector('.login-burger');
  const modal = document.querySelector('.login-modal');
  // const cart = document.querySelector('.cart');
  // const cartdata = document.querySelector('#cartdata');
  const wishData = document.querySelector('.wishdata');
  // if(wishData != null) {
  //   if(wishData.textContent.trim() == '0' && wishData.textContent == null){
  //       console.log(wishdata.textContent) 
  //       wishData.style.display = 'none'
  //   } else {
  //       wishData.style.display = 'block'
  //   }
  // }
  
  
  burger.addEventListener('click' , () => {
    hidden.classList.toggle('show')

})
headerLogin.addEventListener('click', () => {
  modalHeader.classList.toggle('mirar')
})

if (login != null) {
  login.addEventListener('click', () => {
    modal.classList.toggle('mirar');
  })
}
