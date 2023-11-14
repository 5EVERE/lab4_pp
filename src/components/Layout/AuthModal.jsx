import Modal from "../UI/Modal";
const AuthModal = function (props) {
  return (
    <Modal>
      <h1>Ваш Обліковий Запис</h1>
      <div>{props.user}</div>
      <button onClick={props.profileHandler}>Close</button>
    </Modal>
  );
};
export default AuthModal;
