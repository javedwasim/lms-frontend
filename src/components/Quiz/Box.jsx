import Picture from '@/components/Quiz/Picture';

export const Box = ({ answers }) => {
  return answers.map((answer, i) => (
    <div className="ans-drag" key={i}>
      <Picture answer={answer.answer_type_name} id={answer.id} />
    </div>
  ));
};
