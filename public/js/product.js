window.onload = function(){
    const form = document.querySelector('form')
    const name = document.querySelector('#product-name')
    const description = document.querySelector('#product-desc')
    const image = document.querySelector('#product-image')
    const precio = document.querySelector('#product-price')
    const erroresLista = document.querySelector('.erroresLista')
   
   
   
       form.addEventListener('submit', async (e) => {
          e.preventDefault()
   
    
           let errores = []
   
           if (name.value == '') {
   
           errores.push('Debe llenar el nombre')
               name.classList.add('is-invalid')
               name.classList.remove('is-valid') 
           } else {
               name.classList.remove('is-invalid')
               name.classList.add('is-valid')
           }

           if (name.value.length < 5) {
   
            errores.push('El nombre debe tener al menos 5 caracteres')
                name.classList.add('is-invalid')
                name.classList.remove('is-valid') 
            } else {
                name.classList.remove('is-invalid')
                name.classList.add('is-valid')
            }


            if(description.value == '' || description.value.length < 20) {
                errores.push('La descripcion es muy corta')
                description.classList.add('is-invalid')
                description.classList.remove('is-valid') 
               } else {
                description.classList.remove('is-invalid')
                description.classList.add('is-valid')
                }  

           
            if (image.files.length == 0) {
                errores.push('Debe seleccionar una imagen');
            } else {
             const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
             const fileName = image.files[0].name;
             const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

            if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
             errores.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF');
             }
            }
            
           if(precio.value == '') {
            errores.push('Debe llenar el campo precio ')
            precio.classList.add('is-invalid')
            precio.classList.remove('is-valid') 
           } else {
            precio.classList.remove('is-invalid')
            precio.classList.add('is-valid')
            }   



   
            if (errores.length > 0) {
               erroresLista.innerHTML =  ` `
               for (let error of errores) {
                   erroresLista.innerHTML += `<li>${error}</li>`
               }
           } else{
               erroresLista.innerHTML =  ` `
                form.submit()
            
        }
            


   
       })
   
   }