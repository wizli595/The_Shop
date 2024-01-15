import { useTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';
import { BsGlobe } from 'react-icons/bs';
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <>
            <NavDropdown title={<BsGlobe />} id="languageSelect" onSelect={changeLanguage} defaultValue={i18n.language}>
                <NavDropdown.Item eventKey="fr">Français</NavDropdown.Item>
                <NavDropdown.Item eventKey="arb">العربية</NavDropdown.Item>

            </NavDropdown>
        </>
    );
};

export default LanguageSwitcher;
