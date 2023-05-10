export default function validate(input) {
    let error = {}

    if (!input.name) {
        error.name = 'Name is required'
    }

    if (!input.weightMin) {
        error.weightMin = 'weightMin is required'
    }

    if (!input.weightMax) {
        error.weightMax = 'weightMax is required'
    }

    if (!input.heightMin) {
        error.heightMin = 'heightMin is required'
    }

    if (!input.heightMax) {
        error.heightMax = 'heightMax is required'
    }

    if (!input.life_spanMin) {
        error.life_spanMin = 'lifespan Min is required'
    }

    if (!input.life_spanMax) {
        error.life_spanMax = 'lifespan Max is required'
    }

    if (input.temperament.length === 0) {
        error.temperament = 'Please select at least one temperament';
      }
      

    return error
}