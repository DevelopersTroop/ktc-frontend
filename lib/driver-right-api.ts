import { apiBaseUrl } from "@/app/utils/api";

const username = "Tire_Wheel_Experts";
const securityToken = "0b035d5ccecc43f2a9adce9849c7024e";

/**
 * Call Driver Right API by passing baseURL and query parameters
 */
const callDriverRight = async (baseURL: string, queryParameters: Record<string, any> = {}): Promise<any> => {
    const parameters = {
        username,
        securityToken,
        ...queryParameters
    };

    const url = `${baseURL}?${new URLSearchParams(parameters).toString()}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error: unknown) {
        // Ensure the error is an object with a 'message' property
        const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred";
        return { error: `Something went wrong. ${errorMessage}` };
    }
};


/**
 * Get Regions
 */
const getRegions = async (): Promise<Record<string, string>> => {
    const regionsResponse = await fetch(`${apiBaseUrl}/year-makes/regions`);
    return (await regionsResponse.json()).data.regions as Record<string, string>;
};

/**
 * Get Years
 */
const getYears = async (): Promise<string[]> => {
    const yearsResponse = await fetch(`${apiBaseUrl}/year-makes/years`);
    return (await yearsResponse.json()).data.years as string[];
};

/**
 * Get Makes
 */
const getMakes = async (year: string, regionId = "1"): Promise<string[]> => {
    const makesResponse = await fetch(`${apiBaseUrl}/year-makes/makes?year=${year}&regionID=${regionId}`);
    return (await makesResponse.json()).data.makes as string[];
};

/**
 * Get Models
 */
const getModels = async (year: string, make: string, regionId = "1"): Promise<string[]> => {
    const modelsResponse = await fetch(`${apiBaseUrl}/year-makes/models?year=${year}&manufacturer=${make}&regionID=${regionId}`);
    return (await modelsResponse.json()).data.models as string[];
};


/**
 * Get Body Types
 */
const getBodyTypes = async (year: string, make: string, model: string, regionId = "1"): Promise<string[]> => {
    const bodyTypeResponse = await fetch(`https://api.driverightdata.com/EU/api/aaia/GetAAIABodyTypes?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${year}&regionID=${regionId}&manufacturer=${make}&model=${model}`);
    return (await bodyTypeResponse.json()).map((bodyTypeObj: { BodyType: string }) => bodyTypeObj['BodyType']) as string[];
};


/**
 * Get Sub Models
 */
const getSubModels = async (year: string, make: string, model: string, bodyType: string, regionId = "1"): Promise<{ SubModel: string, DRChassisID: string, DRModelID: string }[]> => {
    const subModelResponse = await fetch(`https://api.driverightdata.com/EU/api/aaia/GetAAIASubModelsWheels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${year}&regionID=1&manufacturer=${make}&model=${model}&bodyType=${bodyType}`);
    return (await subModelResponse.json()) as { SubModel: string, DRChassisID: string, DRModelID: string }[];
};

/** Get Vehicle Info */
const getVehicleData = async (modelId: string, chassssisId: string) => {
    const vehicleInfoResponse = await fetch(`https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&DRDModelID=${modelId}&DRDChassisID=${chassssisId}`);
    const vehicleInfo = await vehicleInfoResponse.json();

    // bolt pattern / PCD
    const boltPattern = vehicleInfo['DRDChassisReturn_NA']['PCD'];

    // rim size
    const frontRimSize = vehicleInfo['DRDChassisReturn_NA']['RimSize'];
    const rearRimSize = vehicleInfo['DRDChassisReturn_NA']['RimSize_R'] || frontRimSize;


    // center bore
    const frontCenterBore = vehicleInfo['DRDChassisReturn_NA']['CenterBore'];
    const rearCenterBore = vehicleInfo['DRDChassisReturn_NA']['CenterBore_R'] || frontCenterBore;

    // get tire sizes
    const tireSizes: { front: string, rear: string }[] = [];
    const primaryOption = vehicleInfo['DRDModelReturn']['PrimaryOption'] as { TireSize: string, TireSize_R: string };

    const otherOptions = vehicleInfo['DRDModelReturn']['Options'] as (typeof primaryOption)[]

    const mainFrontTireSize = vehicleInfo['DRDChassisReturn_NA']['TireSize'];
    const mainRearTireSize = vehicleInfo['DRDChassisReturn_NA']['TireSize_R'];

    if (mainFrontTireSize && (mainRearTireSize || mainFrontTireSize)) {
        tireSizes.push({
            front: mainFrontTireSize,
            rear: mainRearTireSize || mainFrontTireSize
        });
    }

    if (primaryOption['TireSize'] && (primaryOption['TireSize_R'] || primaryOption['TireSize'])) {
        tireSizes.push({
            front: primaryOption['TireSize'] as string,
            rear: primaryOption['TireSize_R'] || primaryOption['TireSize']
        });
    }
    otherOptions.map(option => tireSizes.push({ front: option.TireSize, rear: option.TireSize_R || option.TireSize }))

    return {
        boltPattern,
        frontRimSize,
        rearRimSize,
        frontCenterBore,
        rearCenterBore,
        tireSizes
    } as {
        boltPattern: string;
        frontRimSize: string;
        rearRimSize: string;
        frontCenterBore: string;
        rearCenterBore: string;
        tireSizes: Record<"front" | "rear", string>[]
    }
}

export { getRegions, getYears, getMakes, getModels, getBodyTypes, getSubModels, getVehicleData };
