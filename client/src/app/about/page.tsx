import ComponentMain from "@/components/main-component";

const About = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
          <div className="container mx-auto ">
            <h2 className="text-3xl font-bold mb-4">Về Chúng Tôi</h2>
            <p className="mb-4">
              Chào mừng bạn đến với PetShop, nơi cung cấp các sản phẩm và dịch
              vụ tốt nhất cho thú cưng của bạn. Chúng tôi cam kết mang đến cho
              bạn những sản phẩm chất lượng cao và dịch vụ tận tâm, giúp bạn
              chăm sóc và nuôi dưỡng thú cưng của mình một cách tốt nhất.
            </p>
            <p className="mb-4">
              Tại PetShop, chúng tôi hiểu rằng thú cưng không chỉ là vật nuôi mà
              còn là thành viên trong gia đình. Đó là lý do tại sao chúng tôi
              cung cấp một loạt các sản phẩm từ thức ăn, đồ chơi đến các dịch vụ
              chăm sóc sức khỏe. Chúng tôi luôn tìm kiếm những sản phẩm mới nhất
              và tốt nhất trên thị trường để đảm bảo rằng thú cưng của bạn nhận
              được sự chăm sóc tốt nhất.
            </p>
            <p className="mb-4">
              Đội ngũ nhân viên của chúng tôi là những người yêu thú cưng và có
              kinh nghiệm trong lĩnh vực chăm sóc thú cưng. Họ luôn sẵn sàng tư
              vấn và hỗ trợ bạn trong việc chọn lựa sản phẩm phù hợp nhất cho
              thú cưng của bạn. Chúng tôi tin rằng mỗi thú cưng đều có những nhu
              cầu riêng, và chúng tôi ở đây để giúp bạn đáp ứng những nhu cầu
              đó.
            </p>
            <p className="mb-4">
              Ngoài việc cung cấp sản phẩm, chúng tôi còn tổ chức các sự kiện và
              hoạt động thú vị dành cho thú cưng và chủ nhân của chúng. Từ các
              buổi hội thảo về chăm sóc thú cưng đến các buổi giao lưu, chúng
              tôi mong muốn tạo ra một cộng đồng yêu thú cưng, nơi mọi người có
              thể chia sẻ kinh nghiệm và kiến thức.
            </p>
            <p>
              Hãy đến với chúng tôi để trải nghiệm dịch vụ tuyệt vời và tìm kiếm
              những sản phẩm phù hợp nhất cho thú cưng của bạn! Chúng tôi rất
              mong được chào đón bạn và thú cưng của bạn tại PetShop!
            </p>
          </div>
        </section>
      </ComponentMain>
    </div>
  );
};

export default About;
