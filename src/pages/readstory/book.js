import React from "react";
import HTMLFlipBook from "react-pageflip";
import "./styles.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

class DemoBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      screeHt: 1
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  onPage = (e) => {
    this.setState({
      page: e.data
    });
  };

  componentDidMount() {
    this.setState({
      totalPage: this.flipBook.getPageFlip().getPageCount()
    });
    this.setState({
      screeHt: window.innerHeight
    });
  }

  render() {
    return (
      <div className="book-wrapper">
        <HTMLFlipBook
          width={550}
          height={733}
          minWidth={315}
          maxWidth={550}
          minHeight={720}
          maxHeight={700}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="demo-book"
          ref={(el) => (this.flipBook = el)}
        >
          <PageCover>BOOK TITLE</PageCover>
          {pages.map((page, index) => (
            <Page key={index} className="page" number={index}>
              <div className="page">
                <h1>{page.title}</h1>
                <img src={page.img} alt="" className="page-image" />
                <p>{page.content}</p>
              </div>
            </Page>
          ))}
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
      </div>
    );
  }
}

const pages = [
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  },
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  },
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  },
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  },
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  },
  {
    title: "page-1",
    img:
      "https://storage.googleapis.com/studio-design-asset-files/projects/BXax1BQgW7/s-1000x1300_v-fms_webp_fa3f2151-85a1-443d-a15d-7914f0205713.webp",
    content: "lorem"
  }
 ];

export default function App() {
  return <DemoBook />;
}
