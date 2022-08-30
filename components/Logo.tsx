export default function Logo(props: any) {
	return (
		<svg
			className="logo"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 700 499.2"
			fill="currentColor"
			{...props}
		>
			<defs>
				<linearGradient
					id="animated-gradient"
					gradientTransform="rotate(90)"
				>
					<stop offset="5%" stopColor="#f2ebec">
						<animate
							attributeName="stop-color"
							values="#f2ebec;#ca685f;#f2ebec"
							dur="10s"
							repeatCount="indefinite"
						/>
					</stop>
					<stop offset="95%" stopColor="#ffe1de" />
				</linearGradient>
			</defs>

			<path d="M258 247.2L16.8 22.7l247.7-.3 69.9 107.4L258 247.2zM504.5 476.6L369.2 350.7l67.8-63.2 123 189.2-55.5-.1zM139.7 476.8l131.6-202.2h.1L361 137c0-.1 0-.3.1-.3l74.3-114.4 247.7.3-487.6 454-55.8.2z" />
		</svg>
	);
}
