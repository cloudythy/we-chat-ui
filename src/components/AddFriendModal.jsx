import {UserRoundPlus} from 'lucide-react';

export const AddFriendModal = () => {
  return (
    <>
      <button onClick={() => document.getElementById('my_modal_2').showModal()}><UserRoundPlus/>
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box p-0">
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700">Thông tin tài khoản</h2>
          </div>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {/* Main Content */}
          <div className="p-4">
            {/* Profile Section */}
            <div className="flex items-center">
              {/* Image */}
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                alt="Cover"
                className="h-16 w-16 rounded-full object-cover border border-gray-300"
              />
              {/* Name */}
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Ngọc Tài</h3>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700"
              rows="3"
              readOnly
            >
              Xin chào, mình là Mai Thy. Mình tìm thấy bạn bằng số điện thoại. Kết bạn với mình nhé!
            </textarea>
              <div className="text-right text-sm text-gray-400">86/150 ký tự</div>
            </div>

            {/* Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Chặn người này xem nhật ký của tôi</span>
                <input type="checkbox" className="toggle toggle-sm" defaultChecked/>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 p-4 border-t border-gray-300">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
              Thông tin
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
              Kết bạn
            </button>
          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}