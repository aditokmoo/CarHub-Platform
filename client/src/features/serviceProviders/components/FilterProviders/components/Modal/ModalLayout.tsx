import Modal from '../../../../../../components/Modal/Modal'
import FilterModal from './FilterModal/FilterModal'
import MyCarModal from './MyCarModal/MyCarModal'

interface PropTypes {
    isActive: Record<string, boolean>
}

export default function ModalLayout({ isActive }: PropTypes) {
    return (
        <>
            {isActive['filterModal'] && (
                <Modal>
                    <FilterModal />
                </Modal>
            )}

            {isActive['myCarFilterModal'] && (
                <Modal>
                    <MyCarModal />
                </Modal>
            )}
        </>
    )
}
