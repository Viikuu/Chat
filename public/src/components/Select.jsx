export function Select({options, onChange}) {
	return (
		<select onChange={onChange} className={`block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
			{options.map(option => {
				return (<option className={"border-2 border-white hover:bg-violet-900"} key={option.name} value={option.name}> {option.name} </option>)
			})}
		</select>
	)
}