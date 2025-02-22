import { DataT } from '../../types';
import IMAGE_01 from '../images/01.jpg';
import IMAGE_02 from '../images/02.jpg';
import IMAGE_03 from '../images/03.jpg';
import IMAGE_04 from '../images/04.jpg';
import IMAGE_05 from '../images/05.jpg';
import IMAGE_06 from '../images/06.jpg';
import IMAGE_07 from '../images/07.jpg';
import IMAGE_08 from '../images/08.jpg';
import IMAGE_09 from '../images/09.jpg';
import IMAGE_10 from '../images/10.jpg';

const data: DataT[] = [
    {
        id: 1,
        name: 'Slim Fit Jacket',
        isAvailable: true,
        price: '$78',
        description:
            'Stylish slim fit jacket perfect for cold weather. Made from premium wool blend.',
        details: 'Available in black, navy, and grey.',
        image: IMAGE_01,
    },
    {
        id: 2,
        name: 'Classic Blue Jeans',
        price: '$59',
        description:
            'Timeless blue jeans with a modern fit. Perfect for casual outings or semi-formal events.',
        isAvailable: false,
        details: 'Comfort stretch, medium wash, sizes 28-36.',
        image: IMAGE_02,
    },
    {
        id: 3,
        name: 'Cotton Crewneck T-shirt',
        price: '$25',
        description:
            'Soft, breathable cotton t-shirt that is an everyday essential. Available in multiple colors.',
        isAvailable: true,
        details: 'Machine washable, sizes S-XL.',
        image: IMAGE_03,
    },
    {
        id: 4,
        name: 'Leather Chelsea Boots',
        price: '$120',
        description:
            'Handcrafted leather Chelsea boots that pair perfectly with both formal and casual outfits.',
        isAvailable: true,
        details: 'Available in black and brown, sizes 7-12.',
        image: IMAGE_04,
    },
    {
        id: 5,
        name: 'Denim Jacket',
        price: '$85',
        description:
            'Classic denim jacket with a modern twist. Durable and perfect for layering.',
        isAvailable: false,
        details: 'Faded wash, sizes M-XXL.',
        image: IMAGE_05,
    },
    {
        id: 6,
        name: 'Wool Blend Scarf',
        price: '$40',
        description:
            'Soft wool blend scarf to keep you warm during the winter months. Available in various colors.',
        isAvailable: true,
        details: 'Length: 72 inches, width: 10 inches.',
        image: IMAGE_06,
    },
    {
        id: 7,
        name: 'Leather Belt',
        price: '$35',
        description:
            'Classic leather belt with a sleek buckle. Available in brown and black.',
        isAvailable: true,
        details: 'Adjustable sizes available: S, M, L.',
        image: IMAGE_07,
    },
    {
        id: 8,
        name: 'Tailored Chinos',
        price: '$70',
        description:
            'Comfortable yet stylish chinos perfect for work or a casual day out.',
        isAvailable: true,
        details: 'Slim fit, available in khaki, navy, and olive.',
        image: IMAGE_08,
    },
    {
        id: 9,
        name: 'Flannel Shirt',
        price: '$45',
        description:
            'Cozy flannel shirt made from soft cotton. Ideal for layering in cool weather.',
        isAvailable: true,
        details: 'Available in plaid patterns, sizes S-XXL.',
        image: IMAGE_09,
    },
    {
        id: 10,
        name: 'Puffer Jacket',
        price: '$150',
        description:
            'Warm puffer jacket with water-resistant fabric. Perfect for harsh winter conditions.',
        isAvailable: false,
        details: 'Available in red, blue, and black, sizes M-XXL.',
        image: IMAGE_10,
    },
];

export default data;
