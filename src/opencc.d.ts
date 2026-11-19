declare module "opencc-js/t2cn" {
	/** OpenCC converter between Chinese variants, e.g. { from: "t", to: "cn" }. */
	export function Converter(options: { from: string; to: string }): (text: string) => string;
}
