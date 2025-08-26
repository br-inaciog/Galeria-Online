import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import Home from '../pages/home/Home'
import { Galeria } from "../pages/galeria/Galeria";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" exact />
                <Route element={<Galeria />} path="/Galeria" />
            </Routes>
        </BrowserRouter>
    )
}