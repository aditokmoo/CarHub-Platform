import Modal from '../../../../../../components/Modal/Modal'
import FilterModal from './FilterModal/FilterModal'
import MyCarModal from './MyCarModal/MyCarModal'

interface PropTypes {
    isActive: Record<string, boolean>,
    toggle: (key: string) => void
}

export default function ModalLayout({ isActive, toggle }: PropTypes) {
    return (
        <>
            {isActive['filterModal'] && (
                <Modal>
                    <FilterModal toggle={toggle} />
                </Modal>
            )}

            {isActive['myCarFilterModal'] && (
                <Modal>
                    <MyCarModal toggle={toggle} />
                </Modal>
            )}
        </>
    )
}
