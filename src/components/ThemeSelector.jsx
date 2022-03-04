import './ThemeSelector.css'
import { useTheme } from './../hooks/useTheme';
import modeIcon from './../assets/mode-icon.svg';


const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
    const { mode, changeColor, changeMode } = useTheme();

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className='theme-selector'>
            <div className="mode-toggle">
                <img
                    onClick={toggleMode} 
                    src={modeIcon} alt="icon" 
                />
            </div>

            <div className="theme-buttons">
                { themeColors.map(color => (
                    <div  
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}
