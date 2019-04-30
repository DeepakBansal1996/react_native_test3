const validate = (val,rules,connectedValue) => {
    let isValid=true;
    for(let rule in rules){
        switch(rule){
            case 'isEmail' : 
                  isValid = isValid && emailValidator(val);
                  break;
            case 'minLength' : 
                  isValid = isValid && milLengthValidator(val, rules[rule]);
                  break;
            case 'equalTo' : 
                  isValid = isValid && equalToValidator(val, connectedValue[rule]);
                  break;
            case 'notEmpty' : 
                  isValid && notEmptyValidator(val);
                  break;
            default : 
                  isValid=true;
           }
       }
       return isValid;
    }

    const emailValidator = (val) => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
    };

    const milLengthValidator = (val, minLength) => {
          return val.length >= minLength;
    };

    const equalToValidator = (val, checkValue) => {
               return val === checkValue;
    };

    const notEmptyValidator = (val) => {
          return val.trim()!=="";
    };



export default validate;