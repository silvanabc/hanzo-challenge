import * as React from "react";
import './HomePage.css';

interface IProps {
}

interface IState {
  searchStr?: string;
  similar_terms?: object[];
}

export default class HomePage extends React.Component<IProps, IState> {
  API:string = "https://hanzo-ds-similarterms-api-temp-5pkhhxrhua-uc.a.run.app";

  constructor(props: IProps){
      super(props);
      this.state = {};
  }
  
  performSearch(term:string) {
      const similar = [{"term": "ubuntu", "score": 1.0}, {"term": "kubuntu", "score": 0.5846825242042542}, {"term": "ubunut", "score": 0.5746731460094452}, {"term": "xubuntu", "score": 0.5620551109313965}, {"term": "ubunutu", "score": 0.5515865385532379}, {"term": "lubuntu", "score": 0.5497856438159943}, {"term": "natty", "score": 0.5483379364013672}, {"term": "linux", "score": 0.530470460653305}, {"term": "ubunto", "score": 0.5276621282100677}, {"term": "oneiric", "score": 0.5184265971183777}];
      this.setState({similar_terms: similar})

      /*
      fetch("https://hanzo-ds-similarterms-api-temp-5pkhhxrhua-uc.a.run.app", {
        headers: {
          "X-Hanzo-Limit": "3",
          "X-Hanzo-Query": term
        }
      }).then(res => res.json())
        .then(json => {
        this.setState({similar_terms: json.similar_terms})
    });*/
  }

  handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
        search: { value: string };
    };
    if (target.search.value) {
        this.setState({searchStr: target.search.value});
        this.performSearch(target.search.value)
    }
  }

  renderSimilarTerms() {
    if (this.state.similar_terms && this.state.similar_terms.length){

        let list = this.state.similar_terms.map((s:any) => s.term + " - ")

        let lastElement = list.pop();
        list.push(lastElement!.replace("- ", ""))

        return (
            <div className="SimilarTerms">
                <h3>Similar Terms</h3>
                {list}
            </div>
        )
        
        
    }
  }

  render() {
    return (
      <div className="HomePage">
        <h2>Hanzo Frontend Challenge</h2>
        <section>
            
            <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
            Word: &nbsp;
            <input type="text" name="search" value={this.state.searchStr} />
            </label>
            <input type="submit" value="Search" />
        </form>
        </section>
        <section>
            {this.renderSimilarTerms()}
        </section>
        
      </div>
    );
  }
}
