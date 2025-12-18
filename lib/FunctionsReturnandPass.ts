import React from "react";


function convertDOMElement( element: string, DOM: string): string // we assign what values we pass to the function and also what It should return !
{
    return "converted";
}

// In the world of react these are just called Componenets and whatever we pass into them the Parameters are called Props !

export default function Button(props: string){
    return(
        <button className="bg-blue-500 text-white rounded px-4 py-2 ">
        Click Me 
        </button>
    );
} 