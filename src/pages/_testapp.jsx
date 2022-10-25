import { useEffect, useState } from "react";
import axios from "axios";
import MD from "./MD";

function Test() {
    const [loading, setLoading] = useState(true);
    const [MDs, setMDs] = useState([]);

    const getMDs = async() => {
        const response = await axios.get(
            "http://3.35.231.145:8080/api/md/list"
        );
        setMDs(response.data.result);
        setLoading(false);
    };
    useEffect(() => {
        getMDs();
    }, []); //한 번만 동작함
    console.log(MDs)
    
    // 위 코드와 동일
    // useEffect(() => {
    //     axios.get("http://3.35.231.145:8080/api/md/list")
    //         // .then((response) => console.log(response.data));
    //         .then((response) => {
    //             setMDs(response.data.result);
    //             setLoading(false);
    //         });
    // }, []); //한 번만 동작함
    // // console.log(MDs)

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {MDs.map((md) => (
                        <MD
                            key={md.id}
                            name={md.name}
                            price={md.price}
                        />
                    //     <div key={MD.id}>
                    //     <h2>{MD.name}</h2>
                    //     <p>{MD.price}</p>
                    //     {/* <ul>
                    //         {MD.kcd.map((k) => (
                    //             <li key={k}>{k}</li>
                    //         ))}
                    //     </ul> */}
                    // </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Test;