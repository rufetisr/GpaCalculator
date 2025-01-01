import { useState } from 'react';
import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './LangSelectBox.css'

function LangSelectBox() {
    const { t, i18n } = useTranslation();
    const savedLang = localStorage.getItem('lang') || 'en';

    const languages = [
        { code: 'en', name: 'English', flag: 'https://flagsapi.com/GB/shiny/64.png' },
        { code: 'ru', name: 'Russian', flag: 'https://flagsapi.com/RU/shiny/64.png' },
        { code: 'az', name: 'Azerbaijan', flag: 'https://flagsapi.com/AZ/shiny/64.png' },
    ];

    const initialLanguage = languages.find((lang) => lang.code === savedLang) || languages[0];

    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

    const handleSelect = (code) => {
        const selected = languages.find((lang) => lang.code === code);
        setSelectedLanguage(selected);
        i18n.changeLanguage(code); // Change language dynamically
        localStorage.setItem('lang', code);
    };

    return (
        <div className='lang-select-div'>
            <DropdownButton
                size='sm'
                id="dropdown-basic-button"
                title={
                    <span>
                        <Image
                            src={selectedLanguage.flag}
                            alt={selectedLanguage.name.substring(0, 2)}
                            width="20"
                            className="me-2"
                        />
                        {t('language_select')}
                        {/* {selectedLanguage.name} */}
                    </span>
                }
            >
                {languages.map((lang) => (
                    <Dropdown.Item
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                    >
                        <Image
                            src={lang.flag}
                            width="20"
                            className="me-2"
                        />
                        {lang.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
}

export default LangSelectBox;
