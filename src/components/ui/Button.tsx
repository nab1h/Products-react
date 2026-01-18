import type { ButtonHTMLAttributes } from 'react';
interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement>{
    name: string,
    colorBtn: 'blue' | 'green' | 'red',
    className?: string,
}
const Button = ({name,colorBtn,className, ...rest}:Iprops) =>{
    let bg = '';

  switch (colorBtn) {
    case 'blue':
      bg = 'bg-blue-500';
      break;
    case 'green':
      bg = 'bg-green-500';
      break;
    case 'red':
      bg = 'bg-red-500';
      break;
    default:
      bg = 'bg-amber-700';
  }
    return(
        <button className={`${className} p-3 ${bg} rounded-xl font-bold text-amber-100 w-full cursor-pointer`} {...rest}>{name}</button>
    )
}
export default Button;