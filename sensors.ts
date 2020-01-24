namespace House {    
    let light_variable = 0
    let temperature_variable = 0
	let humidity_variable = 0
	let heat_variable = 0
	let button_variable = 0
	let motion_variable = 0
	let flame_variable = 0
	let towngas_variable = 0
	
	let ledCommand = ""
	let vibratorCommand = ""
	let usbCommand = ""
	let buzzerCommand = ""
	let motor1Command = ""
	let motor2Command = ""
	let servoCommand = ""
	let generalCommand = ""
	
	export enum ServoDirection {
        //% block="clockwise"
        clockwise,
        //% block="anti-clockwise"
        anticlockwise
    }

    export enum ServoSpeed {
        //% blockId=servo360_level_0
        //% block="Stop"
        level0 = 0,
        //% blockId=servo360_level_1
        //% block="Level 1"
        level1 = 1,
        //% blockId=servo360_level_2
        //% block="Level 2"
        level2 = 2,
        //% blockId=servo360_level_3
        //% block="Level 3"
        level3 = 3
    }
	
	export enum GeneralSensorPort {
        //% block="A1"
        a1,
        //% block="A2"
        a2,
		//% block="A3"
        a3,
		//% block="A6"
        a6,
		//% block="A7"
        a7
    }
	
	export enum GeneralActuatorPort {
        //% block="P0"
        p0,
		//% block="P1"
        p1,
        //% block="P2"
        p2,
		//% block="P13"
        p13,
		//% block="P15"
        p15,
		//% block="P16"
        p16
    }
	
    // -------------- 1. Initialization ----------------
    //%blockId=initialize_house
    //%block="Initialize Smarthon multiple-sensor"
    //% weight=90	
    export function initializeWifi(): void {
        serial.redirect(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate9600);

        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            let temp = serial.readLine()

            if (temp.charAt(0).compare("L") == 0) {

                light_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("T") == 0) {

                temperature_variable = parseInt(temp.substr(1, temp.length-2))

            }  else if (temp.charAt(0).compare("H") == 0) {

                humidity_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("A") == 0) {

                heat_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("B") == 0) {

                button_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("M") == 0) {

                motion_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("F") == 0) {

                flame_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("O") == 0) {

                towngas_variable = parseInt(temp.substr(1, temp.length-2))

            }else {
                basic.showString(temp)
            }
        })

        basic.pause(5000);
    }

    //% blockId="smarthon_get_light_house" 
    //% block="Get light value (intensity)"
    //% weight=80	
	//% blockGap=7	

    export function getLight(): number {
        return light_variable;
    }

    //% blockId="smarthon_get_temperature_house" 
    //% block="Get temperature (°C)"
    //% weight=79
	//% blockGap=7	

    export function getTemperature(): number {
        return temperature_variable;
    }
	
		
	//% blockId="smarthon_get_humidity_house" 
    //% block="Get humidity (percentage)"
    //% weight=78	
	//% blockGap=7	

    export function getHumidity(): number {
        return humidity_variable;
    }
	
	//% blockId="smarthon_get_heat" 
    //% block="Get heat (index)"
    //% weight=77	
	//% blockGap=7	

    export function getHeat(): number {
        return heat_variable;
    }

	//% blockId="smarthon_get_button" 
    //% block="Get button (pressed or not)"
    //% weight=76	
	//% blockGap=7	

    export function getButton(): number {
        return button_variable;
    }

	
	//% blockId="smarthon_get_motion" 
    //% block="Get motion (triggered or not)"
    //% weight=75	
	//% blockGap=7	

    export function getMotion(): number {
        return motion_variable;
    }

	//% blockId="smarthon_get_flame" 
    //% block="Get flame (present or not)"
    //% weight=74	
	//% blockGap=7	

    export function getFlame(): number {
        return flame_variable;
    }
	//% blockId="smarthon_get_towngas" 
    //% block="Get town gas value (intensity)"
    //% weight=73

    export function getTownGas(): number {
        return towngas_variable;
    }
	
	//% blockId="smarthon_get_generalsensor" 
    //% block="Get general sensor value port %port"
    //% weight=72
	//% blockGap=7	

    export function getGeneralSensor(port: GeneralSensorPort): number {
        switch (port) {
			case GeneralSensorPort.a1:
				return light_variable;
				break
			case GeneralSensorPort.a2:
				return button_variable;
				break
			case GeneralSensorPort.a3:
				return motion_variable;
				break
			case GeneralSensorPort.a6:
				return flame_variable;
				break
			case GeneralSensorPort.a7:
				return towngas_variable;
			break
		}
    }
	
	//% blockId="smarthon_red_LED"
    //% block="Set Red LED to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=49
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnRedLED(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P0, intensity);
    }
	
	//% blockId="smarthon_green_LED"
    //% block="Set Green LED to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=48
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnGreenLED(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P1, intensity);
    }
	
	//% blockId="smarthon_yellow_LED"
    //% block="Set Yellow LED to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=47
	//%subcategory=More
	//% blockGap=7	

	
    export function TurnYellowLED(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P2, intensity);
    }
	
		
	//% blockId="smarthon_buzzer"
    //% block="Set Buzzer to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=46
	//%subcategory=More	
	
    export function TurnBuzzer(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P14, intensity);
    }
	
	//% blockId="smarthon_motorfan_cw"
    //% block="Set Motor fan clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=45	
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnMotorCW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P13, intensity);
    }

	
	//% blockId="smarthon_motorfan_acw"
    //% block="Set Motor fan anti-clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=44
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnMotorACW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P0, intensity);
    }
	
	
	//% blockId="smarthon_180_servo"
    //% block="Set 180° Servo to degree %degree"
    //% intensity.min=0 intensity.max=180
    //% weight=43
	//%subcategory=More
	//% blockGap=7	
	
    export function Turn180Servo(intensity: number): void {
			
		pins.servoWritePin(AnalogPin.P15, intensity)
    }
	
		
	//% blockId="smarthon_360_servo"
    //% block="Set 360° Servo to direction %direction|speed %speed"
    //% weight=42
	//%subcategory=More
	
    export function Turn360Servo(direction: ServoDirection, speed: ServoSpeed): void {
		
		switch (direction) {
			
			case ServoDirection.clockwise:
				switch (speed) {
					case ServoSpeed.level0:
						pins.servoWritePin(AnalogPin.P16, 90)
						break
					case ServoSpeed.level1:
						pins.servoWritePin(AnalogPin.P16, 83)
						break
					case ServoSpeed.level2:
						pins.servoWritePin(AnalogPin.P16, 82)
						break
					case ServoSpeed.level3:
						pins.servoWritePin(AnalogPin.P16, 80)
						break
				}
				break
				
			case ServoDirection.anticlockwise:
				switch (speed) {
					case ServoSpeed.level0:
						pins.servoWritePin(AnalogPin.P16, 90)
						break
					case ServoSpeed.level1:
						pins.servoWritePin(AnalogPin.P16, 96)
						break
					case ServoSpeed.level2:
						pins.servoWritePin(AnalogPin.P16, 97)
						break
					case ServoSpeed.level3:
						pins.servoWritePin(AnalogPin.P16, 98)
						break
				}
				break
		}
    }
	
	//% blockId="smarthon_house_general_output"
    //% block="Set general output port %port|intensity %intensity"
	//% intensity.min=0 intensity.max=1023
    //% weight=41
	//%subcategory=More
	
    export function TurnGeneralOutput(port: GeneralActuatorPort, intensity: number): void {
		switch (port) {
			case GeneralActuatorPort.p0:
				pins.analogWritePin(AnalogPin.P0, intensity);
				break
			case GeneralActuatorPort.p1:
				pins.analogWritePin(AnalogPin.P1, intensity);
				break
			case GeneralActuatorPort.p2:
				pins.analogWritePin(AnalogPin.P2, intensity);
				break
			case GeneralActuatorPort.p13:
				pins.analogWritePin(AnalogPin.P13, intensity);
				break
			case GeneralActuatorPort.p15:
				pins.analogWritePin(AnalogPin.P15, intensity);
				break
			case GeneralActuatorPort.p16:
				pins.analogWritePin(AnalogPin.P16, intensity);
			break
		}
    }
	


}