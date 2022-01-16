


const generateInput = {

    generate_random_string(_size=50, _char=true,  _special=true, _numeric=true){
        let characters = ''
        let result = ''
        if(_char){
            characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        }
        if(_special){
            characters += '~!#$%&*-_:;.?'
        }
        if(_numeric){
            characters += '0123456789'
        }
        for ( var i = 0; i < _size; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
         return result
    }
    

}


export default {...generateInput}