export default function validate(input) {
    let error = {};
  
    if (!input.name) {
      error.name = 'Name is required';
    }
  
    if (!input.weightMin) {
      error.weightMin = 'weightMin is required';
    }
  
    if (!input.weightMax) {
      error.weightMax = 'weightMax is required';
    }
  
    if (!input.heightMin) {
      error.heightMin = 'heightMin is required';
    }
  
    if (!input.heightMax) {
      error.heightMax = 'heightMax is required';
    }
  
    if (!input.life_spanMin) {
      error.life_spanMin = 'lifespan Min is required';
    }
  
    if (!input.life_spanMax) {
      error.life_spanMax = 'lifespan Max is required';
    }
  
    if (input.temperament.length === 0) {
      error.temperament = 'Please select at least one temperament';
    }
  
    // Validacion de maximo no puede ser menor a minimo
    if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
      error.weightMax = 'The maximum value cannot be equal to or less than the minimum';
    }
    
    if (parseInt(input.heightMax) <= parseInt(input.heightMin)) {
      error.heightMax = 'The maximum value cannot be equal to or less than the minimum';
    }
    
    if (parseInt(input.life_spanMax) <= parseInt(input.life_spanMin)) {
      error.life_spanMax = 'The maximum value cannot be equal to or less than the minimum';
    }
    
  
    return error;
  }
  