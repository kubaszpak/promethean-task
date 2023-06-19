import React, { useRef, useState } from "react";
import "./App.css";

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isTracking, setIsTracking] = useState(false);
	const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

	const handleMouseClick = () => {
		if (!isTracking) setPoints([]);
		setIsTracking(!isTracking);
	};

	const handleMouseMove = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		if (isTracking) {
			const canvas = canvasRef.current;
			if (canvas) {
				const rect = canvas.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				const newPoints = [...points, { x, y }];
				setPoints(newPoints);
			}
		}
	};

	return (
		<div className="App">
			<canvas
				className="tracker"
				ref={canvasRef}
				width={500}
				height={500}
				onClick={handleMouseClick}
				onMouseMove={handleMouseMove}
			></canvas>
			{isTracking && <p>Tracking points...</p>}
			{!isTracking && points.length > 0 && (
				<div>
					<h3>Collected Points:</h3>
					<ul>
						{points.map((point, index) => (
							<li key={index}>
								x: {point.x}, y: {point.y}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
