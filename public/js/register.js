window.onload = function(){
    const form = document.querySelector('form')
       form.addEventListener('submit', async (e) => {
          e.preventDefault()

           const name = document.querySelector('#register-name')
           const email = document.querySelector('#register-email')
           const password = document.querySelector('#register-passw')
           const image = document.querySelector('#fotoPerfil')
           const erroresLista = document.querySelector('.erroresLista')


           let errores = []

           if (name.value == '') {
           errores.push('Debe llenar el campo "Nombre completo"')
               name.classList.add('is-invalid')
               name.classList.remove('is-valid') 
           } else {
               name.classList.remove('is-invalid')
               name.classList.add('is-valid')
           }

           if (name.value.length < 2) {
            errores.push('El campo "Nombre completo" debe tener al menos 2 caracteres')
                name.classList.add('is-invalid')
                name.classList.remove('is-valid') 
            } else {
                name.classList.remove('is-invalid')
                name.classList.add('is-valid')
            }

            if (email.value == '') {
                errores.push('Debe llenar el campo "E-mail"')
                    name.classList.add('is-invalid')
                    name.classList.remove('is-valid') 
                } else {
                    name.classList.remove('is-invalid')
                    name.classList.add('is-valid')
                }

                 
            if (email.validity.typeMismatch) {
                errores.push('El E-mail no es válido');
            }else {
                name.classList.remove('is-invalid')
                name.classList.add('is-valid')
            } 


            if (password.value == '') {
                 errores.push('Debe llenar el campo "Contraseña"')
                    password.classList.add('is-invalid')
                    password.classList.remove('is-valid') 
                } else {
                    password.classList.remove('is-invalid')
                    password.classList.add('is-valid')
                }

            if (password.value.length < 8) {
                errores.push('El campo "Contraseña" debe tener al menos 8 caracteres')
                password.classList.add('is-invalid')
                password.classList.remove('is-valid') 
                } else {
                password.classList.remove('is-invalid')
                password.classList.add('is-valid')
                }
                
            if (image.files.length == 0) {
                    errores.push('Debe seleccionar una imagen de perfil');
            } else {
                 const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                 const fileName = image.files[0].name;
                 const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

            if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
                 errores.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF');
                 }
            }


            

            if (errores.length > 0) {
               erroresLista.innerHTML =  ` ` 
               for (let error of errores) {
                   erroresLista.innerHTML += `<ul><li>${error}</li></ul>`
               }
           } else{
               erroresLista.innerHTML = ` `
               form.submit()
           } 



       })

}