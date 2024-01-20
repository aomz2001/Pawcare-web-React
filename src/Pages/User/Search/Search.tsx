import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type SearchResults = {
    provider_id: number;
    provider_firstname: string;
    provider_lastname: string;
    district_name: string;
    pet_name: string;
    service_name: string;
    service_price: number;
}[];

export const Search = () => {
    const [searchParams] = useSearchParams();
    const petId = searchParams.get("petId");
    const districtId = searchParams.get("districtId");
    const serviceId = searchParams.get("serviceId");

    const [searchResults, setSearchResults] = useState<SearchResults>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/provider-search', {
                    pet_id: petId,
                    district_id: districtId,
                    service_id: serviceId
                });

                setSearchResults(response.data.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (petId && districtId && serviceId) {
            fetchData();
        }
    }, [petId, districtId, serviceId]);

    const handleSearch = (providerId: number) => {
        if (petId && districtId && serviceId) {
            try {
                const searchParams = new URLSearchParams({
                    petId: petId.toString(),
                    districtId: districtId.toString(),
                    serviceId: serviceId.toString(),
                    provider_id: providerId.toString()
                });

                navigate(`/provider-profile?${searchParams.toString()}`);
            } catch (error) {
                console.error("Error in handleSearch:", error);
            }
        } else {
            console.log("Please select values for all options");
        }
    };

    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container">
                    <div className="container pt-20 pb-20 flex flex-col items-center">
                        <div className="border-b-2 border-stone-200 w-full mb-10">
                            <div className="pb-2 flex gap-x-2 pl-10">
                                <div className="bg-stone-200 p-2 rounded-3xl">บริการที่แนะนำสำหรับคุณ</div>
                            </div>
                        </div>

                        {searchResults.map((result) => (
                            <Link
                                key={result.provider_id}
                                to={`/provider-profile/${result.provider_id}`}
                                className="text-lg h-auto bg-[#2D2D2D] w-4/5 mb-5 rounded-3xl pl-12 pt-6 pb-6 flex justify-between hover:bg-[#4f4f4f]"
                                onClick={() => handleSearch(result.provider_id)}>
                                <div className="md:flex">
                                    <div className="h-44 bg-white w-44 flex items-center justify-center rounded-full">profile</div>
                                    <div className="pl-9 gap-2 flex flex-col justify-center">
                                        <h3 className="text-[#F0C163]">ชื่อผู้ให้บริการ : {result.provider_firstname} {result.provider_lastname}</h3>
                                        <p className="text-white">บริการ : {result.service_name}</p>
                                        <p className="text-white">อำเภอ : {result.district_name}</p>
                                        <p className="text-white">สัตว์เลี้ยงที่ให้บริการ : {result.pet_name}</p>
                                    </div>
                                </div>
                                <div className="text-[#F0C163] pr-12 flex items-center">{result.service_price} บาท / บริการ</div>
                            </Link>
                        ))}

                    </div>
                    <div className="flex justify-end pr-28 pb-12 underline">
                        <Link to='/'>กลับไปหน้าก่อนหน้านี้</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
