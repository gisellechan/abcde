
/**
 * Use this file to define custom functions and blocks. 
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
//% weight=100 color=#6495ED icon="\uf030"
namespace Camera {

    let is_human=false
    let human_score=0

    // -------------- 1. Intialize Camera ----------------
    //% blockId=initialize_camera
    //% block="Initialize Smarthon Camera Module"   
    //% weight=100
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
        
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            let temp = serial.readLine()

            if (temp.charAt(0).compare("*") == 0) {
                human_score = parseInt(temp.substr(1, temp.length - 1))
            }
            else if (temp == "faces") {
                    is_human = true
            }
            else if (temp == "no") {
                    is_human = false
            }
            
            serial.writeString("got")
        })
    }

    // -------------- 3. Start Object Detection ----------------
    //% blockId=Camera_ObjDetection
    //% block="Start Object Detection"
    //% weight=80
    //% blockGap=7
    export function ObjDetection(): void {
        serial.writeString("object")
    }

    // -------------- 4. Start Camera mode ----------------
    //% blockId=Camera_StartCamera
    //% block="Start Camera Preview"
    //% weight=70
    export function StartCamera(): void {
        serial.writeString("camera")
    }

     // -------------- 5. get Face Variable ----------------
    //% blockId=Camera_dataResponse_faces
    //% block="Human Face Is Detected"
    //% weight=60
    //% blockGap=7
    export function DataResponse_faces(): boolean {
        return is_human
    }
    //% blockId=Camera_human_score
    //% block="Get Human Score (percentage)"
    //% weight=50
    //% blockGap=7
    export function get_human_score(): number {
        return human_score
    }

    // -------------- 6. get Object Variable ----------------
    //% blockId=Camera_dataResponse_obj
    //% block="Get Camera Object Name (string)"
    //% weight=40
    //% blockGap=7
    export function DataResponse_obj(): string {
        let temp = ""
        temp = serial.readLine()
        serial.writeString("got")
        return temp;
    }

    // -------------- 7. Camera Capture ----------------
    //% blockId=Camera_CapturePhoto
    //% block="Capture Photo Now"
    //% weight=20
    //% blockGap=7
    export function CapturePhoto(): void {
        serial.writeString("capture")
    }

}
