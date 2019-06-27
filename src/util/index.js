import parser from 'ua-parser-js'

export function isMobile () {
	return parser().device.type === 'mobile'
}
