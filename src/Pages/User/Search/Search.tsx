import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import httpClient from "../../../utils/httpClient";
import { Breadcrumb, Select } from "antd";
import { SearchInfo } from "./SearchInfo";

type SearchResults = {
    provider_id: number;
    provider_firstname: string;
    provider_lastname: string;
    district_name: string;
    pet_name: string;
    service_name: string;
    service_price: number;
    booking_start: string;
    booking_end: string;
}[];

export const Search = () => {
    const [searchParams] = useSearchParams();
    const petId = searchParams.get("petId");
    const districtId = searchParams.get("districtId");
    const serviceId = searchParams.get("serviceId");
    const [searchResults, setSearchResults] = useState<SearchResults>([]);
    const [priceFilter, setPriceFilter] = useState<string | null>(null);
    const navigate = useNavigate();
    console.log('searchResults',searchResults)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpClient.post('public/api/provider-search', {
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
        if (petId && districtId && serviceId && providerId) {
            try {
                const searchParams = new URLSearchParams({
                    petId: petId.toString(),
                    districtId: districtId.toString(),
                    serviceId: serviceId.toString(),
                    providerId: providerId.toString()
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
                    <div className="pt-20 pb-20 flex flex-col items-center">
                        <div className="border-b-2 border-stone-200 w-full mb-10 flex justify-between">
                            <div className="flex items-center">
                                <Breadcrumb
                                    className="breadcrumb"
                                    separator=">"
                                    items={[
                                        {
                                            title: <Link to='/'>หน้าหลัก</Link>
                                        },
                                        {
                                            title: 'ผู้ให้บริการ(พี่เลี้ยง)',
                                        },
                                    ]}
                                />
                            </div>
                            <div className="pb-2 flex gap-x-2 px-10">
                                <Select
                                    defaultValue="ทุกราคา"
                                    className="find-mentor"
                                    style={{ width: 180 }}
                                    placeholder="เลือกราคา"
                                    onChange={(value) => setPriceFilter(value.toString())}
                                    value={priceFilter}
                                    options={[
                                        { value: '300', label: 'น้อยกว่า 300 บาท' },
                                        { value: '500', label: 'น้อยกว่า 500 บาท' },
                                        { value: '501', label: '500 บาทขึ้นไป' },
                                        { value: '0', label: 'ทุกราคา' },
                                    ]}
                                />
                            </div>
                        </div>
                        {searchResults.map((result) => {
                            const isPriceInRange =
                                (!priceFilter ||
                                    (priceFilter === "300" && result.service_price < 300) ||
                                    (priceFilter === "500" && result.service_price < 500) ||
                                    (priceFilter === "501" && result.service_price >= 500) ||
                                    (priceFilter === "0" && result.service_price > 0)
                                );
                            return (
                                isPriceInRange && (
                                    <div
                                        key={result.provider_id}
                                        className="text-lg h-auto bg-[#2D2D2D] w-3/5 mb-5 rounded-3xl p-10 flex justify-between hover:bg-[#4f4f4f] cursor-pointer lg:w-4/5 max-[1020px]:flex-col "
                                        onClick={() => handleSearch(result.provider_id)}
                                    >
                                        <SearchInfo key={result.provider_id} detail={result} providerId={result.provider_id} />
                                    </div>
                                )
                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    );
};
