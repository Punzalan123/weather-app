import { useState } from "react";
import { AsyncPaginate as Aspg } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../API";
import './search.css';


const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    // Default Location, Aspg suggested searches, 
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode} `,
                        };
                    }),
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

    }


    return (
        <Aspg
            placeholder="Search "
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            className='search-bar'
        />
    )
}

export default Search;