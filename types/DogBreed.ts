export interface DogBreed {
    temperament: any;
    origin: any;
    id: string;
    name: string;
    description: string;
    life: {
        max: number,
        min: number
    }
}

export interface DogBreedsById {
    id: string;
    attributes: {
        imageUrl: string;
        name: string;
        description: string;
        life: {
            max: number,
            min: number
        }
    };
    relationships:{
        group: {
            data: {
                id: string;
                type:string;
            }
        }
    };
    memo?: string;
    type: string;
    imageUrl?: string 
}