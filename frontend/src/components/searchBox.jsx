import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();

    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword] = useState(urlKeyword || "");

    const { t } = useTranslation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/search/${keyword.trim()}`);
            setKeyword("");
        } else {
            navigate('/');
        }

    };

    return (<>
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder={t("Search Products...")}
                className="mr-sm-2 ml-sm-5"
            />
            <Button type="submit" variant="outline-light" className="p-2 mx-2">
                {t('Search')}
            </Button>
        </Form>

    </>);
};

export default SearchBox;