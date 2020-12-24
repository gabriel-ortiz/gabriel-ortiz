import React, { useContext, createContext, useState } from 'react';

//create context
const Context = createContext(null);

//setup main hook for using context
export const UseApp = () => useContext(Context);

//setup HOC
export const AppProvider = (props) => {
	const [state, setState] = useState({
		headerEl: null,
	});

	return (
		<Context.Provider value={{ state, setState }}>
			<>{props.children}</>
		</Context.Provider>
	);
};
