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
        error.life_spanMin = 'life_spanMin is required'
    }

    if (!input.life_spanMax) {
        error.life_spanMax = 'life_spanMax is required'
    }

    return error
}