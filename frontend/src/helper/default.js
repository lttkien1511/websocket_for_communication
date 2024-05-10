import Swal from 'sweetalert2'

window.makeAlert = (level, title, message=null, autoHide=null)=>{
    /**
     * input:
     * level: 'error', 'success', 'warning'
     */
    Swal.fire({
        icon: level,
        title: title,
        text: message,
        timer: autoHide
    })
}



