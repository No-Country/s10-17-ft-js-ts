interface T extends React.SVGProps<SVGSVGElement> {
  width: number | string
  height: number | string
}
export const Icons = {
  Close: ({ width, height, ...props }: T) => (<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none"><path fill="currentColor" d="M3.6125 0 8.5 6.1328 13.3875 0H17l-6.5875 7.5L17 15h-3.6125L8.5 9.1797 3.6125 15H0l6.4813-7.5L0 0h3.6125Z"/></svg>)
}
