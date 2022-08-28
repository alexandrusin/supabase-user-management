import Image from "next/image";
import Link from "next/link";

import imageCategory1 from "../public/categories/1.jpg";
import imageCategory2 from "../public/categories/2.jpg";
import imageCategory3 from "../public/categories/3.jpg";
import imageCategory4 from "../public/categories/4.jpg";

export default function ShowcaseCategories() {
	const categoriesData = [
		{
			image: imageCategory1,
			name: "0-2",
			description:
				"Nu v-ați imaginat vreodată cum zâmbește bebelușul dvs. cu vârsta cuprinsă între 0-2 ani pe un poster sau pe un afiș publicitar în magazin dvs. preferat sau cum joacă într-un film publicitar? Decizia vă aparține.",
			actionInfo:
				"Înscrieți-vă imediat copilul ca model la agenția noastră!",
			actionLabel: "BabyModels",
			link: "/models/categories/0-2",
		},
		{
			image: imageCategory2,
			name: "2-15",
			description:
				"Copilul dumneavoastră are vârsta cuprinsă între 2 și 15 ani, este simpatic, haios sau nostim și este receptiv, fotogenic și se distrează în fața camerei? Nu contează dacă are pielea deschisă sau închisă la culoare, dacă este mic sau mare, trăsăturile fizice speciale și o personalitate activă reprezintă atracția materialului publicitar.",
			actionInfo:
				"Înscrieți-vă imediat copilul ca model la agenția noastră!",
			actionLabel: "ModelKids",
			link: "/models/categories/2-15",
		},
		{
			image: imageCategory3,
			name: "15-50",
			description:
				"Aveți vârsta cuprinsă între 15 și 50 de ani, sunteți mare sau mic, slab sau plinuț, tânăr sau cu sufletul tânăr, atractiv sau remarcabil, aveți personalitate și carismă și vă place să stați în fața camerei sau în lumina reflectoarelor sau doriți să luați parte la spoturile publicitare?",
			actionInfo: "Aplicați imediat ca model la agenția noastră!",
			actionLabel: "Modele",
			link: "/models/categories/15-50",
		},
		{
			image: imageCategory4,
			name: "50+",
			description:
				"Chiar și la vârsta de peste 50 de ani nu este prea târziu să vă îndepliniți visul de a fi model și acesta este momentul potrivit pentru a începe! Aveți vârsta cuprinsă între 50 și 80 de ani, sunteți mic sau mare, slab sau plinuț, tânăr sau cu sufletul tânăr, atractiv, îngrijit sau remarcabil? Aplică și totul se va schimba!",
			actionInfo:
				"Aplicați imediat ca model cu vârsta de peste 50 de ani!",
			actionLabel: "Peste 50 ani",
			link: "/models/categories/50+",
		},
	];

	return (
		<div className="showcase-categories">
			{categoriesData.map((category, index) => {
				return (
					<div className="card" key={"category-" + index}>
						<Link href={category.link!}>
							<div className="image">
								<Image
									src={category.image}
									layout="responsive"
									objectFit="cover"
									alt={"Category for " + category.name}
								/>
							</div>
						</Link>
						<h2 className="title headline4">
							{category.name} <span>ani</span>
						</h2>
						<div className="description body1">
							{category.description}
						</div>
						<div className="info body2 text-grey">
							{category.actionInfo}
						</div>
						<Link href={category.link!}>
							<a className="primary-button">
								<span className="helper">către</span>
								<span className="label">
									{category.actionLabel}
								</span>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
