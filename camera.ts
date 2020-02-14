
/**
 * Use this file to define custom functions and blocks. 
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
//% weight=100 color=#6495ED icon="\uf030"
namespace Camera {

    // -------------- 1. Intialize Camera ----------------
    //% blockId=initialize_camera
    //% block="Initialize Smarthon Camera Module"   
    //% weight=100
    //% blockGap=7
    export function initizlizeCamera(): void {
        serial.redirect(
            SerialPin.P16,
            SerialPin.P8,
            BaudRate.BaudRate115200
        )
    }
    // -------------- 2. Start Face Detection ----------------
    //% blockId=Camera_FaceDetection
    //% block="Start Face Detection"
    //% weight=90
    //% blockGap=7
    export function FaceDetection(): void {
        serial.writeString("faces")
    }
    // -------------- 3. Start Object Detection ----------------
    //% blockId=Camera_ObjDetection
    //% block="Start Object Detection"
    //% weight=80

    export function ObjDetection(): void {
        serial.writeString("object")
    }
    // -------------- 4. Return Detection Value ----------------
    //% blockId=Camera_dataResponse_faces
    //% block="Human Face Is Detected"
    //% weight=70
    //% blockGap=7
    export function DataResponse_faces(): boolean {
        let temp = ""
        temp = serial.readLine()
        serial.writeString("got")
        if (temp == "faces")
            return true;
        else
            return false;
    }

    //% blockId=Camera_dataResponse_obj
    //% block="Get Camera Object Name (string)"
    //% weight=60
    export function DataResponse_obj(): string {
        let temp = ""
        temp = serial.readLine()
        serial.writeString("got")
        return temp;
    }


}
