export default class Utils {

  static dateToRest(d: string): string {
    if (d) {
      let dia, mes, ano;
      if (d.indexOf("/") == -1) {
        dia = d.substring(0, 2);
        mes = d.substring(2, 4);
        ano = d.substring(4);
      } else {
        [dia, mes, ano] = d.split("/")
      }
      return `${ano}-${mes}-${dia}`;
    } else {
      return "";
    }
  }

  static dateFromRest(d: string): string {
    if (d) {
      const [ano, mes, dia] = d.split("-");
      return `${dia}/${mes}/${ano}`
    } else {
      return "";
    }
  }

  static timestampToRest(ts: string): string {
    if (ts) {
      let [datePart, timePart] = ts.split(" ");
      let dia, mes, ano, hora, minuto, segundo;

      if (datePart.indexOf("/") == -1) {
        dia = datePart.substring(0, 2);
        mes = datePart.substring(2, 4);
        ano = datePart.substring(4);
      } else {
        [dia, mes, ano] = datePart.split("/");
      }

      if (timePart) {
        [hora, minuto, segundo] = timePart.split(":");
      }

      return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
    } else {
      return "";
    }
  }

  static timestampFromRest(ts: string): string {
    if (ts) {
      const [datePart, timePart] = ts.split("T");
      const [ano, mes, dia] = datePart.split("-");
      const [hora, minuto, segundo] = timePart.split(":");

      return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    } else {
      return "";
    }
  }

}
