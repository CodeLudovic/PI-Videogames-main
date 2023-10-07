import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateForm from "../../src/views/CreateForm/CreateForm";

// Mock para useDispatch y useNavigate (puedes ajustarlo según tus necesidades)
jest.mock("react-redux", () => ({
	useDispatch: () => jest.fn(),
}));
jest.mock("react-router-dom", () => ({
	useNavigate: () => jest.fn(),
}));

describe("CreateForm component", () => {
	it("should render without errors", () => {
		render(<CreateForm />);
		// Verifica que el componente se renderice sin errores
		expect(screen.getByTestId("create-form")).toBeInTheDocument();
	});

	it("should handle form submission", () => {
		const { getByTestId } = render(<CreateForm />);
		const submitButton = getByTestId("submit-button");

		fireEvent.click(submitButton);

		// Verifica que se haya manejado la presentación del formulario
		// Puedes verificar otras interacciones y validaciones aquí
	});

	// Agrega más pruebas según las funcionalidades de tu componente
});
