import { useTranslation } from 'react-i18next';
const TableHead = () => {
    const { t } = useTranslation();
    return (<>
        <thead>
            <tr className='text-uppercase'>
                <th ><strong>id</strong></th>
                <th><strong>date</strong></th>
                <th><strong>total</strong></th>
                <th><strong>{t('paid')}</strong></th>
                <th><strong>{t('delivered')}</strong></th>
                <th></th>
            </tr>
        </thead>
    </>);
};

export default TableHead;