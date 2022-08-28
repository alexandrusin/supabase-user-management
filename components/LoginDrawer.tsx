import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Logo from "./Logo";

export default function LoginDrawer() {
	const [show, setShow] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (show) {
			setShow(!show);
		}
	}, [router.asPath]);

	const LoginDrawerBtn = () => {
		return (
			<div
				id="login-drawer"
				className={`account-button ${show ? "open" : "close"}`}
				onClick={() => setShow(!show)}
			>
				{!show && <MdAccountCircle className="account-icon" />}
				{show && <MdClose className="account-icon" />}
			</div>
		);
	};

	const LoginDrawerLayout = () => {
		return (
			<div className={`login-drawer-content ${show ? "open" : "close"}`}>
				<Logo fill="url(#animated-gradient)" />
				<h4 className="headline6 title">Autentificare</h4>
				{/* <h4 className="headline6 subtitle text-primary">
					Model sau Client
				</h4> */}
				<div className="input-wrapper">
					<label htmlFor="login-email">Email</label>
					<input
						className="input-round"
						type="text"
						id="login-email"
						// onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="login-password">Parola</label>
					<input
						className="input-round"
						type="password"
						id="login-password"
						// onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<div className="checkbox-wrapper">
					<input
						className="input-round"
						type="checkbox"
						id="login-remember"
						// onChange={(event) => setPassword(event.target.value)}
					/>
					<label htmlFor="login-remember">Remember me</label>
				</div>
				<button className="primary-button login-button">
					<MdLogin />
					Login
				</button>
				<div className="login-helper body2">
					Ai uitat parola?{" "}
					<Link href="/register/">
						<a className="primary-link">Resetează</a>
					</Link>
				</div>
				<div className="login-helper body2">
					Nu ai cont?{" "}
					<Link href="/register/">
						<a className="primary-link">Înregistrează-te</a>
					</Link>
				</div>
				<div className="login-helper body2">
					Logându-vă, sunteți de acord cu{" "}
					<Link href="/register/">
						<a className="primary-link">Termenii și condițiile</a>
					</Link>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className={`login-drawer ${show ? "open" : "close"}`}>
				<LoginDrawerBtn />
				<LoginDrawerLayout />
				<div></div>
			</div>
			{/* {show && <div className="login-backdrop"></div>} */}
		</>
	);
}
