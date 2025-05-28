export const  circle_functions = {
    wrap: (x: number, is_radians: boolean = true) => {
        if (is_radians) {
            return (x + Math.PI) % (2 * Math.PI) - Math.PI
        } else {
            return (x + 180) % 360 - 180
        }
    },

    deg2rad: (deg: number) => {
        return deg * (Math.PI / 180)
    },

    rad2deg: (rad: number) => {
        return rad * (180 / Math.PI)
    },

    calc_response_error(response: number, correct_angle: number, absolute: boolean = false) {
        let error = response - correct_angle
        if (absolute) {
            error = Math.abs(error)
        }
        error = circle_functions.wrap(error)
        return absolute ? error : Math.abs(error)

    }
}