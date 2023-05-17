import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'djyzydw2k',
    api_key: '675519894649237',
    api_secret: 'BRexnSIfhIH-foMsXOgEG19PKiQ',
    secure: true
});

describe('Pruebas en fileUpload', () => {  
    test('Debe de subir el archivo correctamente a cloudinary', async () => {  
        const imageUrl = 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto');

        const url = await fileUpload(file);
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        await cloudinary.api.delete_resources(['journal-app/' + imageId], {
            resource_type: 'image'
        });
    })

    test('Debe de retornar el error', async () => {  
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect( url ).toBe(null);
    })
})